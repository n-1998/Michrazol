using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class AreasConvertor
    {
        public static Entities.CitiesAreas convert(Models.CitiesAreas areas)
        {
            return new Entities.CitiesAreas() { AreaId = areas.AreaId, AreaName = areas.AreaName };
        }

        public static Models.CitiesAreas convert(Entities.CitiesAreas areas)
        {
            return new Models.CitiesAreas() { AreaId = areas.AreaId, AreaName = areas.AreaName };
        }
        
        public static List<Entities.CitiesAreas> convert(List<Models.CitiesAreas> areasList)
        {
            List<Entities.CitiesAreas> a = new List<Entities.CitiesAreas>();
            foreach (var item in areasList)
            {
                a.Add(convert(item));
            }
            return a;
        }
        public static List<Models.CitiesAreas> convert(List<Entities.CitiesAreas> areasList)
        {
            List<Models.CitiesAreas> a = new List<Models.CitiesAreas>();
            foreach (var item in areasList)
            {
                a.Add(convert(item));
            }
            return a;
        }

    }
}
