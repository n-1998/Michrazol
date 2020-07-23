using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Tender
    {
        //קוד מכרז
        public int Id { get; set; }
        //סוג מוצר
        public int ProductId { get; set; }
        //מחיר מקסימלי
        public Nullable<decimal> MaxCost { get; set; }
        //קוד משתמש
        public int UserId { get; set; }
        //תאריך פתיחת המכרז
        public System.DateTime StartDate { get; set; }
        //עיר
        public Nullable<int> City { get; set; }
        //תיאור המכרז
        public string Description { get; set; }
        //תאריך סיום המכרז
        public System.DateTime EndDate { get; set; }
        //תאריך שינוי אחרון
        public System.DateTime LastModifiedDate { get; set; }
        //האם מעונין במוצר חדש
        public Nullable<bool> IsNew { get; set; }
    }
}


