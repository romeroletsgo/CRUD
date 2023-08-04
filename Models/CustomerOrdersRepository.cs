using System;

namespace CRUD.Models
{
    public class CustomerOrdersRepository : ICustomerOrdersRepository
    {
        private List<CustomerOrder> _data;
        public List<CustomerOrder> CustomerOrders => _data;

        public CustomerOrdersRepository()
        {
            _data = new List<CustomerOrder>()
            {
                new CustomerOrder() { Number = 0001312, Date =  new DateTime(2023, 7, 3), CustomerId = "1", Status = 1, TotalPrice = 2973163},
                new CustomerOrder() { Number = 0003123, Date =  new DateTime(2023, 4, 3), CustomerId = "2", Status = 1, TotalPrice = 31999},
            }; 
        }
        public void Add(CustomerOrder customerOrder)
        {
            _data.Add(customerOrder);
        }

        public void Delete(CustomerOrder customerOrder)
        {
            _data.RemoveAll(order => order.CustomerOrderId == customerOrder.CustomerOrderId);
        }

        public void Edit(CustomerOrder сhangedСustomerOrder)
        {
            _data.Where(currentOrder => 
                        currentOrder.CustomerOrderId == сhangedСustomerOrder.CustomerOrderId)
                .ToList()
                .ForEach(currentOrder => {
                    currentOrder.Number     = сhangedСustomerOrder.Number;
                    currentOrder.Date       = сhangedСustomerOrder.Date;
                    currentOrder.CustomerId = сhangedСustomerOrder.CustomerId;
                    currentOrder.Status     = сhangedСustomerOrder.Status;
                    currentOrder.TotalPrice = сhangedСustomerOrder.TotalPrice;
                });
        }
    }
}
