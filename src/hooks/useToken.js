import { useState } from 'react';

const useToken = () => {
  //to fix refresh after attempted login bug
  //sessionStorage.setItem('token', null)
  
  const getToken = () => {
    //console.log("GetTokenRun")
    
    const tokenString = sessionStorage.getItem('token');
    
    const userToken = JSON.parse(tokenString);
    
    if(userToken?.token){
    return userToken?.token
    }
    else {
      return {_id: 'NOUSER', username: 'NOUSER', password: 'NOUSER', email: 'NOUSER'}
    }
    

  }
    
  const [token, setToken] = useState(getToken());
  //console.log(token)

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return{
    setToken: saveToken,
    token
  }

}

export default useToken;

