# Create a section
#curl -XPOST -H 'Content-Type: application/json' --data @json/section.json http://localhost:8080/sections

# Get sections
#curl http://localhost:8080/sections

# Create an item
#curl -XPOST -H 'Content-Type: application/json' --data @json/item.json http://localhost:8080/items

# Get items for a given section
#curl http://localhost:8080/sections/5fbc21fff8928b155996f554/items

# Get items
#curl http://localhost:8080/items

# Create a table
#curl -XPOST -H 'Content-Type: application/json' --data @json/table.json http://localhost:8080/tables

# Get a list of tables
#curl http://localhost:8080/tables

# Create an order
#curl -XPOST -H 'Content-Type: application/json' --data @json/order.json http://localhost:8080/orders

# List orders
#curl http://localhost:8080/orders