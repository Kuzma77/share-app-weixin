const ifHasdownLoadUrl = (share) =>{
  if(share.downloadUrl == null){
    return false
  }
  else{
    return true
  }
}

module.exports ={
  ifHasdownLoadUrl:(share) =>{
    return ifHasdownLoadUrl(share)
  }
}