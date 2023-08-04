namespace CRUD.Models
{
    public class CustomerOrder
    {
        public string CustomerOrderId { get; set; }
        public int Number { get; set; }
        public DateTime Date { get; set; }

        public string CustomerId { get; set; }

        public int Status { get; set; }
        public Double TotalPrice { get; set; }

        public CustomerOrder()
        {
            CustomerOrderId = Guid.NewGuid().ToString();
        }
    }
}
