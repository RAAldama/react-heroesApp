import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import PrivateRoute from "../../routers/PrivateRoute"

describe('tests on <PrivateRoute />', () => {

    const rest = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();
    
    test('should render the component if user is authenticated and save on LocalStorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuth={true} 
                    component={() => <span>Correcto!</span>} 
                    {...rest}
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPage', '/marvel');
    })

    test('should block the component if it is not logged', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuth={false} 
                    component={() => <span>Correcto!</span>} 
                    {...rest}
                />
            </MemoryRouter>
        );

        expect( wrapper ).toEqual({});
    })
    
    
})
