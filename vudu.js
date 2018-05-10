const length = 25
function getPageFromServer(pageIndex) {
    return new Promise(function(resolve) {
        resolve(Array.from({ length }, (_, i) => length * pageIndex + i));        
    });
}
function getDataRangeFromServer(startIndex, endIndex) {
    if (endIndex < startIndex || startIndex < 0) {
        return Promise.resolve([])
    }
    return new Promise(function(resolve) {
        const startPageIndex = ~~(startIndex / length);
        const endPageIndex = ~~(endIndex / length);
        Promise.all(Array(endPageIndex - startPageIndex + 1)
                    .fill(0).map((_, i) => startPageIndex + i)
                    .map(getPageFromServer)).then(values => values.map((value, index) => {
                        const start = index === 0 ? startIndex % length: 0;
                        const end = index === endPageIndex - startPageIndex ? endIndex % length + 1: length;
                        return value.slice(start, end);
                    })
                ).then(values => resolve([].concat(...values)));
    });
}
getDataRangeFromServer(0, 0).then(result => console.log(result))
getDataRangeFromServer(0, 1).then(result => console.log(result))
getDataRangeFromServer(0, 24).then(result => console.log(result))
getDataRangeFromServer(25, 49).then(result => console.log(result))
getDataRangeFromServer(0, 49).then(result => console.log(result))
getDataRangeFromServer(5, 51).then(result => console.log(result))
getDataRangeFromServer(50, 99).then(result => console.log(result))
getDataRangeFromServer(55, 99).then(result => console.log(result))
getDataRangeFromServer(19, 4).then(result => console.log(result))