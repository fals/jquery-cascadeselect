using JqueryCascadeSelect.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JqueryCascadeSelect.MVC.Controllers
{
    public class HomeController : Controller
    {
        DataContext _dataBase = new DataContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult GetCities(int stateId)
        {
            var cities = _dataBase.Cidades.Where(c => c.CodEstado == stateId).Select(s => new
            {
                text = s.Nome,
                value = s.CodCidade
            });

            return Json(cities, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCountries()
        {
            var counties = _dataBase.Paises.Select(s => new {
                text = s.Nome,
                value = s.CodPais
            });

            return Json(counties, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStates(int countyId)
        {
            var states = _dataBase.Estados.Where(s => s.CodPais == countyId).Select(s => new
            {
                text = s.Nome,
                value = s.CodPais
            });

            return Json(states, JsonRequestBehavior.AllowGet);
        }
    }
}