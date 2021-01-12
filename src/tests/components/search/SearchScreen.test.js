import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router-dom"
import SearchScreen from "../../../components/search/SearchScreen"

describe('tests on <SearchScreen />', () => {
    
    test('should render correctly with default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('¡Busca tu heroe favorito!');
    })

    test('should show superman and the input with the query', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=superman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('superman');
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should show a message of error if there is no hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=xd']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').exists() ).toBe(true);
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No existe un heroe en la base con el nombre xd');
    })
    
    test('should call the push of history', () => {
        const history = {
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=xd']}>
                <Route path="/search" component={() => <SearchScreen history={history}/>} />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'hero',
                value: 'superman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith('?q=superman');
    })
    
})
