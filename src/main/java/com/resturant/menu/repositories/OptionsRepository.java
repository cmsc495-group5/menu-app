/*
 * file Name: OptionsRepository.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Interface for Mongo db interactions for Item Options
 */

package com.resturant.menu.repositories;

import com.resturant.menu.models.Option;
import org.springframework.data.repository.CrudRepository;

public interface OptionsRepository extends CrudRepository<Option, String> {
    void delete(Option deleted);
}
