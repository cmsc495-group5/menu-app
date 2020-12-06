package com.resturant.menu.services;
import com.resturant.menu.models.Menu;
import com.resturant.menu.models.Section;
import com.resturant.menu.repositories.MenusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MenuServiceImpl implements MenuService {

    private MenusRepository menusRepository;

    @Autowired
    public MenuServiceImpl(MenusRepository menusRepository){
        this.menusRepository = menusRepository;
    }

    public Iterable<Menu> getMenus(){
        return menusRepository.findAll();
    }

    public Menu saveMenu(Menu menu){
        menu.setUpdated(new Date().toString());
        menusRepository.save(menu);
        return menu;
    }

    public Optional<Menu> getMenuById( String id) {
        return menusRepository.findById(id);
    }

    public Menu updateMenu(String id, Menu menu) {
        Optional<Menu> optMenu = menusRepository.findById(id);
        Menu m = optMenu.get();
        if(menu.getTitle() != null){
            m.setTitle(menu.getTitle());
        }
        if(menu.getDescription() != null){
            m.setDescription(menu.getDescription());
        }
        if(menu.getInternalDescription() != null){
            m.setInternalDescription(menu.getInternalDescription());
        }
        if(menu.getImage() != null){
            m.setImage(menu.getImage());
        }
        if(menu.getSections() != null){
            m.setSections(menu.getSections());
        }
        if(menu.getActive() != null){
            if(menu.getActive()){
                deactivateActiveMenu();
            }
            m.setActive(menu.getActive());
        }
        m.setUpdated(new Date().toString());
        menusRepository.save(m);
        return m;
    }

    public String deleteMenu( String id) {
        Optional<Menu> optMenu = menusRepository.findById(id);
        Menu menu = optMenu.get();
        menusRepository.delete(menu);
        return "";
    }

    private void deactivateActiveMenu(){
        Menu menu = getActiveMenu();
        menu.setActive(false);
        updateMenu(menu.getId(), menu);
    }

    public void activateMenu(String id) {
        Optional<Menu> menuOpt = getMenuById(id);
        if(menuOpt.isPresent()){
            Menu menu = menuOpt.get();
            deactivateActiveMenu();
            menu.setActive(true);
            updateMenu(id, menu);
        }
    }

    public Menu getActiveMenu() {
        List<Menu> menus =  menusRepository.findByActive(true);
        if(menus.size() >=1){
            return menus.get(0);
        }
        // no record found return an empty menu to prevent errors; this could probably be handled better
        return new Menu("no menu found", "", "", null, new Section[]{});
    }
}
