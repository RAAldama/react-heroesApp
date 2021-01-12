import { mount } from "enzyme"
import { AuthContext } from "../../../auth/AuthContext"
import LoginScreen from "../../../components/auth/LoginScreen"
import { types } from "../../../types/types"

describe('tests on <LoginScreen />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {logged: false}
    }
    
    const history = {
        replace: jest.fn(),
    }
    
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history}/>
        </AuthContext.Provider>
    );

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should made the dispatch and the navigation', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect(history.replace).toHaveBeenCalled();
        expect(contextValue.dispatch).toHaveBeenCalledWith( {payload: {name: 'Albus'}, type: types.login} );

        localStorage.setItem('lastPage','/dc');
        handleClick();

        expect(history.replace).toHaveBeenCalledWith('/dc');
    })
    
})
