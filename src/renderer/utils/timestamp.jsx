// Follow the timegenerateyyyymmddhhmmss，used for downloaded image names
// At most 2000 distinct numbers
function bigfunc(){
  if(!window.numinbigfunc){
    window.numinbigfunc=0
  }
  function smallfunc(){
    window.numinbigfunc+=1
    return "tstamp"+window.numinbigfunc
  }

  return smallfunc
}






export const generateTime=bigfunc()

