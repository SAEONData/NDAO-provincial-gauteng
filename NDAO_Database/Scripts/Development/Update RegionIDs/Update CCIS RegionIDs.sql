--select
--	*
	
update
	Q
set
	Q.[Value] = cast(RM.NewRegionId as nvarchar)
from
	Questions Q
inner join
	(
		Select distinct
			*
		from
			RegionMapping
	) RM
	on RM.OldRegionId = cast(Q.[Value] as int)
inner join
	VMS_TEST.dbo.Regions VR
	on VR.Id = RM.NewRegionId
where
	Q.[Key] = 'Region'