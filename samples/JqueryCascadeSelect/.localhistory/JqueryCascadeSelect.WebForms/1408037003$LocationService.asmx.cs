using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using JqueryCascadeSelect.Data;

namespace JqueryCascadeSelect.WebForms
{
    DataContext _dataBase = new DataContext();

    [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCountries()
        {
            var counties = _dataBase.Paises.Select(s => new
            {
                text = s.Nome,
                value = s.CodPais
            });

            return new JavaScriptSerializer().Serialize(counties);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetStates(int countyId)
        {
            var states = _dataBase.Estados.Where(s => s.CodPais == countyId).Select(s => new
            {
                text = s.Nome,
                value = s.CodEstado
            });

            return new JavaScriptSerializer().Serialize(states);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GetCities(int stateId)
        {
            var cities = _dataBase.Cidades.Where(c => c.CodEstado == stateId).Select(s => new
            {
                text = s.Nome,
                value = s.CodCidade
            });

            return new JavaScriptSerializer().Serialize(cities);
        }   }
    }
}
