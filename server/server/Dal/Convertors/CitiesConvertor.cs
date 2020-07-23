using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class CitiesConvertor
    {
        public static Entities.Cities convert(Models.Cities city)
        {
            return new Entities.Cities() {CityId=city.CityId,CityName=city.CityName, AreaId=city.AreaId};
        }
        public static Models.Cities convert(Entities.Cities city)
        {
            return new Models.Cities() { CityId = city.CityId, CityName = city.CityName, AreaId = city.AreaId };
        }

        public static List<Entities.Cities> convert(List<Models.Cities> cities)
        {
            List<Entities.Cities> list = new List<Entities.Cities>();
            foreach (var item in cities)
            {
                list.Add(convert(item));
            }
            return list;
        }

        public static List<Models.Cities> convert(List<Entities.Cities> cities)
        {
            List<Models.Cities> list = new List<Models.Cities>();
            foreach (var item in cities)
            {
                list.Add(convert(item));
            }
            return list;
        }
    }
}
