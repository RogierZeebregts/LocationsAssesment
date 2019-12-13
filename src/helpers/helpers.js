/**
 * Sort Helper
 *
 * @param rev
 * @param key
 * @returns {function(*, *): number}
 */
const sortHelper = function (rev = false, key = null) {
    return (a, b) => {
        if (key !== null) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return false;
            }
        }
        
        const valA = key !== null ? a[key].toLowerCase() : a.toLowerCase() // prevent case sensivity
        const valB = key !== null ? b[key].toLowerCase() : b.toLowerCase()
        
        let comparis = 0
        if (valA > valB) {
            comparis = 1
        } else if (valA < valB) {
            comparis = -1
        }
        return rev ? comparis * -1 : comparis
    }
}

/**
 *
 * I create helper files to keep my Vue files clean and create reusable code
 *
 * @returns {{sort: sort}}
 */
export function helpers () {
    return {
        sortHelper,
    }
}
