using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JqueryCascadeSelect.Data
{
    [Table("pais")]
    public class Pais
    {
        public int Id { get; set; }

        [Column("cod_pais")]
        public int CodPais { get; set; }
        [Column("sgl_pais")]
        public string Sigla { get; set; }
        [Column("nom_pais")]
        public string Nome { get; set; }
    }
}
