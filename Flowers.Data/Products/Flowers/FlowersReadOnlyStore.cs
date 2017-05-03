using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.Products.Flowers;

namespace Flowers.Data.Products.Flowers
{
    public class FlowersReadOnlyStore : IFlowersReadOnlyStore
    {
        protected readonly ISqlConnectionHelper SqlConnectionHelper;

		public FlowersReadOnlyStore(ISqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

        public async Task<Flower[]> GetAsync()
        {
            using (var conntection = await SqlConnectionHelper.CreateConnection())
            {
                return (await conntection.QueryAsync<Flower>("SelectFlowersWithMainImage", commandType: System.Data.CommandType.StoredProcedure)).ToArray();
            }
        }

        public async Task<Flower> GetAsync(int id)
        {
            using (var conntection = await SqlConnectionHelper.CreateConnection())
            {
                var multy = await conntection.QueryMultipleAsync(
                    @"
					exec GetFlower @Id = @Id 
					select * from [FlowerVariants] where FlowerId = @Id
					",
                    new { Id = id });

                var flower = multy.Read<Flower>().FirstOrDefault();

                if (flower != null)
                {
                    flower.FlowerVariants = multy.Read<FlowerVariant>();
                }

                return flower;
            }
        }

        public async Task<Flower[]> GetPublishedWithMainImageAsync(FlowersFilter filters, int skip, int take)
        {
            DataTable flowerTypess = GetflowerTypesFromFilter(filters);

            using (var conntection = await SqlConnectionHelper.CreateConnection())
            {
                return (await conntection.QueryAsync<Flower>("SelectPublishedFlowersWithMainImage",
                new
                {
                    Types = flowerTypess,
                    Skip = skip,
                    Take = take
                },
                commandType: CommandType.StoredProcedure)).ToArray();
            }
        }

        

        public async Task<Flower[]> GetRandomPublishedWithMainImageAsync(int count)
        {
            using (var conntection = await SqlConnectionHelper.CreateConnection())
            {
                return (await conntection.QueryAsync<Flower>("SelectRandomPublishedFlowersWithMainImage",
                new
                {
                    Count = count
                },
                commandType: CommandType.StoredProcedure)).ToArray();
            }
        }

        public async Task<int> CountPublishedAsync(FlowersFilter filter)
        {
            FlowerType[] flowerTypess = (filter?.Types ?? Enum.GetValues(typeof(FlowerType)).Cast<FlowerType>()).ToArray();

            using (var conntection = await SqlConnectionHelper.CreateConnection())
            {
                return (await conntection.QueryAsync<int>(@"
                    select 
                        count(*) from dbo.[Flowers] f
                    join dbo.[Products] p on f.Id = p.Id
                    where f.[Type] in @Types and p.[Published] = 1", 
                    new { Types = flowerTypess }))
                    .First();
            }
        }

        private DataTable GetflowerTypesFromFilter(FlowersFilter filters)
        {
            DataTable flowerTypes;

            if (filters?.Types == null || filters.Types.Length == 0)
            {
                flowerTypes = FlowerTypessToDataTable(Enum.GetValues(typeof(FlowerType)).Cast<FlowerType>());
            }
            else
            {
                flowerTypes = FlowerTypessToDataTable(filters?.Types);
            }

            return flowerTypes;
        }

        private DataTable FlowerTypessToDataTable(IEnumerable<FlowerType> flowerTypess)
        {
            var table = new DataTable();
            table.Columns.Add("Id", typeof(int));

            if (flowerTypess == null)
            {
                return table;
            }

            foreach (var item in flowerTypess)
            {
                table.Rows.Add(item);
            }

            return table;
        }
    }
}