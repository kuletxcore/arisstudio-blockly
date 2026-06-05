/**
 * Implementation note.
 */
export function saveToLocalStorage(keyname,data){
    const workspaceString=JSON.stringify(data)
    localStorage.setItem(keyname,workspaceString)
}

/**
 * Implementation note.
 */
export function saveTxt(name,txt,recall=()=>{}){
    // Implementation note.
    const stringData = txt
    // Implementation note.
    const blob = new Blob([stringData], {
        type: "text/plain;charset=utf-8"
    })
    // Implementation note.
    const objectURL = URL.createObjectURL(blob)

    // Implementation note.
    const aTag = document.createElement('a')
    // Implementation note.
    aTag.href = objectURL
    // Implementation note.
    aTag.download = name
    // Implementation note.
    aTag.click()
    // Implementation note.
    // Implementation note.
    URL.revokeObjectURL(objectURL)
    recall()
}

/**
 * Implementation note.
 */
export function uploadTxt(file,resolve){
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        resolve(event.target.result + "")
    });
    reader.readAsText(file,"UTF-8")
}
