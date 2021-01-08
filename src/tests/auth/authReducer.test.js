import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

const user = {name: 'Albus'};

describe('tests on authReducer', () => {
    
    test('should return the default state', () => {
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    })

    test('should auth the name and get the name of the user', () => {
        const state = authReducer({logged: false}, {type: types.login, payload: user});
        expect(state).toEqual({logged: true, name: user.name});
    })
    
    test('should erase the name and had logged = false', () => {
        const state = authReducer({logged: true, name: 'Albus'}, {type: types.logout});
        expect(state.logged).toBe(false);
    })
    
})
