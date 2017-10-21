import "./VenSheet.css"
/*	Components Needed
 *		VenSheet > VenHeader 
 *			 > VirtureBar
 *			 > HighConcept
 *			 > Aspects
 *			 > Devotions
 *			 > Contacts
 *			 > Friends
 *			 > StylePoints > Points, Gear, Banked
 *			 > Manuevers
 *			 > Extras
 *			 > Domain > ProvinceView, TotalResources > Resources, Regions, Vassals
 *			 > Relics, Rituals, Artifacts
 * 
 */






export default VenSheet = ({ven}) => {
	return	<div id="venSheet">
			<h1>{ven.highConcept.title} {ven.highConcept.publicName} {ven.highConcept.familyName}, {ven.highConcept.publicMeaning}</h1> 
			
		</div>
}	
