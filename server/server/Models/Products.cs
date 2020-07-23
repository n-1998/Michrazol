using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Products
    {
        //קוד מוצר
        public int ProductId { get; set; }
        //שם מוצר
        public string ProductName { get; set; }
        //קטגורית המוצר
        public Nullable<int> CategoryId { get; set; }
    }
}

