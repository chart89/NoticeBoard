//selectors
export const getStatus = (state) => state.status;

//actions
 const createActionName = (actionName) => `app/users/${actionName}`;
 const STAT_US = createActionName('STAT_US');

//action creators
export const logIn = payload => ({type: STAT_US, payload});


const statusReducer = (statePart = null, action) => {
    switch (action.type) {
        case STAT_US:
            return action.payload;
        default:
            return statePart
    }
};

export default statusReducer;