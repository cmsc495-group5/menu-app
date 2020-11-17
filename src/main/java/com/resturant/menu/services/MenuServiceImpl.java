package com.resturant.menu.services;

import com.resturant.menu.models.Menu;
import com.resturant.menu.repositories.MenusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        if(menu.getImageId() != null){
            m.setImageId(menu.getImageId());
        }
        if(menu.getSections() != null){
            m.setSections(menu.getSections());
        }
        if(menu.getActive() != null){
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

    private void deactivateAllMenus(){
        Iterable<Menu> menus = getMenus();
        menus.forEach(menu -> {
            menu.setActive(false);
            updateMenu(menu.getId(), menu);
        });
    }

    public void activateMenu(String id) {
        Optional<Menu> menuOpt = getMenuById(id);
        if(menuOpt.isPresent()){
            Menu menu = menuOpt.get();
            deactivateAllMenus();
            menu.setActive(true);
            updateMenu(id, menu);
        }
    }
}
