using CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CRUD.Controllers
{
    public class HomeController : Controller
    {
        private ICustomerOrdersRepository _repository;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ICustomerOrdersRepository repository, ILogger<HomeController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(_repository.CustomerOrders);
        }

        public JsonResult GetByID(string ID)
        {
            var customerOrder = _repository.CustomerOrders.Where(x => x.CustomerOrderId == ID).FirstOrDefault();
            return Json(customerOrder);
        }
        public IActionResult Add([FromBody] CustomerOrder customerOrderObj)
        {
            bool result = false;
            try
            {
                if (customerOrderObj == null) return BadRequest("Data entry error! To change the data?");

                var customerOrder = new CustomerOrder()
                {
                    Number = customerOrderObj.Number,
                    Date = customerOrderObj.Date,
                    CustomerId = customerOrderObj.CustomerId,
                    Status = customerOrderObj.Status,
                    TotalPrice = customerOrderObj.TotalPrice,
                };
                _repository.Add(customerOrder);
                result = true;
            }
            catch
            {

            }
            return Json(result);
        }

        public JsonResult Delete(string ID)
        {
            bool result = false;
            try
            {
                _repository.Delete(_repository.CustomerOrders.Where(x => x.CustomerOrderId == ID).FirstOrDefault());
            }
            catch
            {

            }
            return Json(result);
        }
        public IActionResult Update([FromBody] CustomerOrder customerOrderObj)
        {
            bool result = false;
            try
            {
                if (customerOrderObj == null) return BadRequest("Data entry error! To change the data?");

                if (!string.IsNullOrEmpty(customerOrderObj.CustomerOrderId)) _repository.Edit(customerOrderObj);
                result = true;
            }
            catch
            {

            }
            return Json(result);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}