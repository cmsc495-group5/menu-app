package com.resturant.menu.repositories;

import com.resturant.menu.models.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemsRepository extends CrudRepository<OrderItem, String> {
    void delete(OrderItem deleted);
}
