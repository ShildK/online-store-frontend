import { Product } from "../types/product";
import { AuthenticationService } from "./authenticationService";
import axios from "axios";
import { ShoppingCartItem } from "../types/shoppingCartItem";
import { BACKEND_URL } from "../components/App/App";

export class CartService {
   lsKey: string = "shoppingCartItem";

   _getItemsFromLS(): ShoppingCartItem[] {
      let itemsInLS = localStorage.getItem(this.lsKey);
      if (itemsInLS === null) {
         this._saveItemsInLS([]);
         return [];
      }

      let cartItems: ShoppingCartItem[] = JSON.parse(itemsInLS);
      return cartItems;
   }

   _saveItemsInLS(cartItems: ShoppingCartItem[]) {
      localStorage.setItem(this.lsKey, JSON.stringify(cartItems));
   }

   _clearItemsInLS() {
      localStorage.removeItem(this.lsKey);
   }

   async getShoppingCartItems(): Promise<ShoppingCartItem[]> {
      let isAuthenticated = new AuthenticationService().getUser();
      let shoppingCartItemsInLS = this._getItemsFromLS();
      if (isAuthenticated == undefined) {
         return shoppingCartItemsInLS;
      }

      let response = await axios.get(BACKEND_URL + "/getUserShoppingCartItems", {
         headers: { Authorization: `Bearer ${isAuthenticated.token}` },
      });

      let shoppingCartItemsInDb: ShoppingCartItem[] = JSON.parse(
         JSON.stringify(response.data)
      );
      if (
         shoppingCartItemsInLS.length > 0 &&
         shoppingCartItemsInDb.length == 0
      ) {
         this.setShoppingCartItems(shoppingCartItemsInLS);
      } else if (
         shoppingCartItemsInLS.length > 0 &&
         shoppingCartItemsInDb.length > 0
      ) {
         for (let i = 0; i < shoppingCartItemsInLS.length; i++) {
            let shoppingCartItemInLS = shoppingCartItemsInLS[i];
            let shoppingCartItemInDb = shoppingCartItemsInDb.find(
               (sc) => sc.product.id == shoppingCartItemInLS.product.id
            );
            if (shoppingCartItemInDb == undefined) {
               shoppingCartItemsInDb.push({
                  count: shoppingCartItemInLS.count,
                  product: shoppingCartItemInLS.product,
               });
            } else {
               shoppingCartItemInDb.count += shoppingCartItemInLS.count;
            }
         }
         this.setShoppingCartItems(shoppingCartItemsInDb);
      }

      return shoppingCartItemsInDb;
   }

   async setShoppingCartItems(
      shoppingCartItems: ShoppingCartItem[]
   ): Promise<Boolean> {
      let isAuthenticated = new AuthenticationService().getUser();
      if (isAuthenticated == undefined) {
         this._saveItemsInLS(shoppingCartItems);
         return true;
      }
      try {
        let json = JSON.stringify(shoppingCartItems);

         let result = await axios.post(
            BACKEND_URL + "/setUserShoppingCartItems",
            json,
            { headers: { "Authorization": `Bearer ${isAuthenticated.token}`, "Content-Type": "application/json" } }
         );

         if(result.status === 200){
            this._clearItemsInLS();
         }

         return result.status === 200;
      } catch (error) {

         this._saveItemsInLS(shoppingCartItems);
         return false;
      }
   }

   async addProduct(product: Product) {
      let shoppingCartItems = await this.getShoppingCartItems();
      let shoppingCartItemExist = shoppingCartItems.find((p) => p.product.id === product.id);
      if (shoppingCartItemExist !== undefined) {
         shoppingCartItemExist.count++;
      } else {
         shoppingCartItems.push({ count: 1, product: product });
      }
      await this.setShoppingCartItems(shoppingCartItems);
   }

   async removeProduct(productId: number) {
      let shoppingCartItems = await this.getShoppingCartItems();
      shoppingCartItems = shoppingCartItems.filter((p) => p.product.id !== productId);
      await this.setShoppingCartItems(shoppingCartItems);
   }

   async appendProduct(productId: number) {
      let shoppingCartItems = await this.getShoppingCartItems();
      let shoppingCartItemExist = shoppingCartItems.find((p) => p.product.id === productId);
      if (shoppingCartItemExist === undefined) {
         return;
      }
      shoppingCartItemExist.count++;
      await this.setShoppingCartItems(shoppingCartItems);
   }

   async reduceProduct(productId: number) {
      let cartProducts = await this.getShoppingCartItems();
      let productExist = cartProducts.find((p) => p.product.id === productId);
      if (productExist === undefined) {
         return;
      }
      productExist.count--;
      cartProducts = cartProducts.filter((p) => p.count >= 1);
      await this.setShoppingCartItems(cartProducts);
   }
}
