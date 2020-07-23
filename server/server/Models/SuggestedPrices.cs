using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class SuggestedPrices
    {
        //קוד הצעת מחיר
        public int Id { get; set; }
        //קוד מכרז
        public int TenderId { get; set; }
        //קוד מוצר למכירה
        public int UserProductId { get; set; }
        //מחיר מוצע
        public Nullable<int> SuggestedPrice { get; set; }
        //תאריך עדכון אחרון
        public System.DateTime LastModifiedDate { get; set; }
    }
}

