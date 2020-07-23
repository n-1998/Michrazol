using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ProductForSale
    {
        //מזהה מוצר למכירה
        public int Id { get; set; }
        //בעל המוצר
        public int UserId { get; set; }
        //סוג המוצר
        public int ProductId { get; set; }
        //תיאור על המוצר
        public string Description { get; set; }
        //מקום מכירת המוצר
        public Nullable<int> City { get; set; }
        //מחיר ראשוני למוצר
        public int InitialBid { get; set; }
        //האם מעוניין לקבל הודעות
        public Nullable<bool> InterestedInMessages { get; set; }
        //תאריך עדכון אחרון
        public System.DateTime LastModifiedDate { get; set; }
        //האם המוצר חדש
        public bool IsNew { get; set; }
        public Nullable<int> SelledToTenderId { get; set; }
    }
}

