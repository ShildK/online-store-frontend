const getPagesOffsetForCurrentPage = (
    currentPage: number,
    pagesCount: number,
    elementsCount: number
  ): number[] => {
    
    const pagesNumbers: number[] = [];
    
    const offset: number = (elementsCount - (elementsCount % 2 === 0 ? 0 : 1)) / 2;
    const isCenter: boolean = currentPage > offset && currentPage <= pagesCount - offset;
    const isBeginning: boolean = currentPage - 1 < offset;
    const isEnd: boolean = pagesCount - currentPage < offset;
    let pagesStart: number = 1;
    let pagesEnd: number = pagesCount;
  
    if (isBeginning) {
      pagesStart = 1;
      pagesEnd = elementsCount;
    } else if (isEnd) {
      pagesStart = pagesCount - elementsCount + 1;
      pagesEnd = pagesCount;
    } else if (isCenter) {
      pagesStart = currentPage - offset;
      pagesEnd = currentPage + offset;
    }
  
    for (let i = pagesStart; i <= pagesEnd; i++) {
      pagesNumbers.push(i);
    }
  
    return pagesNumbers;
  };
  
  export default getPagesOffsetForCurrentPage;
  