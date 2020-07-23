using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class TenderDetails
    {
        //קוד מכרז
        public int TenderId { get; set; }
        //מספר משתתפים במכרז
        public int sumPepole { get; set; }
        //המחיר הנמוך ביותר שהוצע למכרז
        public int LowestPrice { get; set; }
        public int DayDiff { get; set; }
    }
}

