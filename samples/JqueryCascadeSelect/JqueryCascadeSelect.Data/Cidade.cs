using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JqueryCascadeSelect.Data
{
    [Table("cidade")]
    public class Cidade
    {
        public int Id { get; set; }
        [Column("cod_cidade")]
        public int CodCidade { get; set; }
        [Column("cod_estado")]
        public int CodEstado { get; set; }
        [Column("nom_cidade")]
        public string Nome { get; set; }
    }
}
