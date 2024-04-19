const AuthReducer = (state,action) => {
    switch(action.type){
     case "LOGIN_START":
            return{
                user:null,
                isfetching:true,
                error:false
            };
     case "LOGIN_SUCCESS":
                return{
                    user:action.payload,
                    isfetching:false,
                    error:false
                };
     case "LOGIN_FAILURE":
                    return{
                        user:null,
                        isfetching:false,
                        error:action.payload
                    };
                    case "Follow":
                        return{
                            ...state,
                            user:{
                                ...state.user,
                                followings:[...state.user.followings,action.payload]
                            }
                        }
                        case "UNFollow":
                            return{
                                ...state,
                                user:{
                                    ...state.user,
                                    followings:state.user.following.filter((following)=>following !== action.payload)
                                }
                            }
        
    
        
    
    default: 
    return state
    }
};

export default AuthReducer