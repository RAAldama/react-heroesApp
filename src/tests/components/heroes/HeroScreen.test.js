import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router-dom";
import HeroScreen from "../../../components/heroes/HeroScreen";

describe('tests on <HeroScreen />', () => {
    
    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    }
    
    test('should render correctly if there is no args on the URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    })

    test('should render correctly if there is a hero to show', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-superman']}>
                <Route path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);
    })

    test('should return to the previous page with Push', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-superman']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    })
    
    test('should return to the previous page with GoBack', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-superman']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.goBack).toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalled();
    })
    
    test('should called the redirect if the hero does not exist', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/lel']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
    })
    
})
