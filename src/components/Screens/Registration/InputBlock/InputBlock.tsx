import React from "react";
import "./InputBlock.css"
import {
   faCheck,
   faTimes,
   faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TSetState } from "../../../../types/others";

interface TProps {
   type: string;
   errorMessage: string;
   placeholder: string;
   setInputState: TSetState<string>;
   setInputFocus: TSetState<boolean>;
   valid: boolean;
   inputFocus: boolean;
   inputState: string;
   ariaDescribedby: string;
}

const InputBlock: React.FC<TProps> = ({
   type,
   errorMessage,
   placeholder,
   setInputState,
   valid,
   inputState,
   inputFocus,
   setInputFocus,
   ariaDescribedby,
}) => {
   return (
      <div>
         <div className="block__input">
            <input
               type={type}
               placeholder={placeholder}
               autoComplete="off"
               onChange={(e) => {
                  setInputState(e.target.value);
               }}
               required
               aria-invalid={valid ? "false" : "true"}
               aria-describedby={ariaDescribedby}
               onFocus={() => setInputFocus(true)}
               onBlur={() => setInputFocus(false)}
               className={
                  valid || !inputState
                     ? "registration__input"
                     : "registration__input red"
               }
            />
            {ariaDescribedby === "confirmnote" ? (
               <span className={valid && inputState ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
               </span>
            ) : (
               <span className={valid ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
               </span>
            )}

            <span className={valid || !inputState ? "hide" : "invalid"}>
               <FontAwesomeIcon icon={faTimes} />
            </span>
         </div>
         <p
            id={ariaDescribedby}
            className={
               inputFocus && inputState && !valid ? "instructions" : "offscreen"
            }
         >
            <FontAwesomeIcon icon={faInfoCircle} />
            {errorMessage}
         </p>
      </div>
   );
};

export default InputBlock;
