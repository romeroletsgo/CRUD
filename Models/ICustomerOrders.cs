namespace CRUD.Models
{
    public interface ICustomerOrdersRepository
    {
        List<CustomerOrder> CustomerOrders { get; }

        void Add(CustomerOrder customerOrder);
        void Edit(CustomerOrder customerOrder);
        void Delete(CustomerOrder customerOrder);
    }
}
