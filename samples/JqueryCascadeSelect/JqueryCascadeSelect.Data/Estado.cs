using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JqueryCascadeSelect.Data
{

    [Table("estado")]
    public class Estado
    {
        public int Id { get; set; }
        [Column("cod_estado")]
        public int CodEstado { get; set; }

        [Column("cod_pais")]
        public int CodPais { get; set; }

        [Column("sgl_estado")]
        public string Sigla { get; set; }

        [Column("nom_estado")]
        public string Nome { get; set; }
    }
}
