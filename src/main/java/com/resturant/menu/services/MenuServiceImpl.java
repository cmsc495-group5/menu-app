/*
 * file Name: MenuServiceImpl.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Implementation of the Menu service interface
 */

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

    private final MenusRepository menusRepository;

    @Autowired
    public MenuServiceImpl(MenusRepository menusRepository) {
        this.menusRepository = menusRepository;
    }

    public Iterable<Menu> getMenus() {
        return menusRepository.findAll();
    }

    public Menu saveMenu(Menu menu) {
        menu.setUpdated(new Date().toString());
        if (menu.getActive()) {
            deactivateActiveMenu();
        }
        menusRepository.save(menu);
        return menu;
    }

    public Optional<Menu> getMenuById(String id) {
        return menusRepository.findById(id);
    }

    public Menu updateMenu(String id, Menu menu) {
        Optional<Menu> optMenu = menusRepository.findById(id);
        Menu menuToUpdate = optMenu.get();
        if (menu.getTitle() != null) {
            menuToUpdate.setTitle(menu.getTitle());
        }
        if (menu.getDescription() != null) {
            menuToUpdate.setDescription(menu.getDescription());
        }
        if (menu.getInternalDescription() != null) {
            menuToUpdate.setInternalDescription(menu.getInternalDescription());
        }
        if (menu.getImage() != null) {
            menuToUpdate.setImage(menu.getImage());
        }
        if (menu.getSections() != null) {
            menuToUpdate.setSections(menu.getSections());
        }
        if (menu.getActive() != null) {
            if (menu.getActive()) {
                deactivateActiveMenu();
            }
            menuToUpdate.setActive(menu.getActive());
        }
        menuToUpdate.setUpdated(new Date().toString());
        menusRepository.save(menuToUpdate);
        return menuToUpdate;
    }

    public String deleteMenu(String id) {
        Optional<Menu> optMenu = menusRepository.findById(id);
        Menu menu = optMenu.get();
        menusRepository.delete(menu);
        return "";
    }

    private void deactivateActiveMenu() {
        List<Menu> menus = menusRepository.findByActive(true);
        // this is over cautious but will correct any state errors if more than one is active on update
        if (menus.size() > 0) {
            for (int i = 0; i < menus.size(); i++) {
                Menu menuToDisable = menus.get(i);
                menuToDisable.setActive(false);
                updateMenu(menuToDisable.getId(), menuToDisable);
            }
        }
    }

    public Menu getActiveMenu() {
        List<Menu> menus = menusRepository.findByActive(true);
        if (menus.size() == 1) {
            return menus.get(0);
        }
        // no record found return an empty menu to prevent errors; this could probably be handled better
        return new Menu("no menu found", "", "", null, new Section[]{});
    }
}
