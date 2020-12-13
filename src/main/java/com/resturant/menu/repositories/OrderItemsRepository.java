/*
 * file Name: OrderItemsRepository.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Interface for Mongo db interactions for OrderItems
 */

package com.resturant.menu.repositories;

import com.resturant.menu.models.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemsRepository extends CrudRepository<OrderItem, String> {
    void delete(OrderItem deleted);
}
