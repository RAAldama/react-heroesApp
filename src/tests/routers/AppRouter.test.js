import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('tests on <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {logged: false}
    }
    
    test('should show the login if it is not authenticated', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should show the Marvel component if it is authenticated', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {logged: true, name: 'Mercy'}
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect( wrapper.find('.navbar').exists() ).toBe(true);
    })
    
})
