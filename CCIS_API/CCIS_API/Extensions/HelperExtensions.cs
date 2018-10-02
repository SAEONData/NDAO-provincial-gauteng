using CCIS_API.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Extensions
{
    public static class HelperExtensions
    {
        public static void ClearIdentityValue<T>(T model)
        {
            var identityProp = model.
                        GetType().
                        GetProperties().
                        FirstOrDefault(x => x.Name == "Id" || x.Name == (typeof(T).Name + "Id"));

            if (identityProp != null)
            {
                if(identityProp.GetValue(model) is int)
                {
                    identityProp.SetValue(model, 0);
                }
                else if(identityProp.GetValue(model) is Guid)
                {
                    identityProp.SetValue(model, null);
                }
            }
        }

        public static void ClearNullableInts<T>(T model)
        {
            var nullableIntProps = model.
                                    GetType().
                                    GetProperties().
                                    Where(x => x.PropertyType == typeof(int?));

            foreach (var prop in nullableIntProps)
            {
                prop.SetValue(model, null);
            }
        }

        public static bool CheckGoalCreateValues(IGoal goal)
        {
            if(string.IsNullOrEmpty(goal.CreateUserId))
            {
                return false;
            }
            goal.Created = DateTime.Now.ToString("yyyy-MM-dd");

            return true;
        }

        public static bool CheckGoalUpdateValues(IGoal goal)
        {
            if (string.IsNullOrEmpty(goal.CreateUserId) && string.IsNullOrEmpty(goal.LastUpdateUserId))
            {
                return false;
            }
            else if(!string.IsNullOrEmpty(goal.CreateUserId) && string.IsNullOrEmpty(goal.LastUpdateUserId))
            {
                goal.LastUpdateUserId = goal.CreateUserId;
            }
            goal.LastUpdated = DateTime.Now.ToString("yyyy-MM-dd");

            return true;
        }
    }
}
