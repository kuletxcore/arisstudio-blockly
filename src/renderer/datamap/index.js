import studentsjson from "./rawjson/students.json";
import soundsjson from "./rawjson/sound.json"





// Build a map from character names to assets
export const students_datamap=[]
for(let stu of studentsjson.students){
    if(stu.sprName.startsWith("CH")||stu.sprName.startsWith("NP")){
        // localized name and asset name
        // Do not lowercase filenames that start with CH or NP
        students_datamap.push([
            stu.zhName.replace(/ /g,"").toLowerCase(),
            stu.sprName.replace(/ /g,"")
        ])
    }else{
        // Lowercase other filenames
        students_datamap.push([
            stu.zhName.replace(/ /g,"").toLowerCase(),
            stu.sprName.replace(/ /g,"").toLowerCase()
        ])
    }

}

// Build a lowercased asset filename to character name map
const student_datadict={}
for(let stu of studentsjson.students){
    student_datadict[stu.sprName.toLowerCase()]=stu.zhName
}
/**
 * Given a spr filename without extension, return the character name
 */
export function getcnnameof(filename){
    const lowfilename=filename.toLowerCase()
    if(student_datadict[lowfilename]){
        return student_datadict[lowfilename]
    }
    return ""
}

// Sound
export const sounds_datamap=soundsjson.sounds
