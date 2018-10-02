import nrf_saeon_img_uri from '../images/nrf_saeon.png'
import sa_flag_img_uri from '../images/sa_flag.jpg'

export const data = {
	title: "Document Links",
	logoTop: { src: nrf_saeon_img_uri, width: "65%" },
	logoBottom: { src: sa_flag_img_uri, width: "30%" },
	nav: [
		{
			id: 1, text: "Technical Information", children: [
				{ id: 11, text: "Integrate CCIS into your own systems", link: "http://www.example.com" }
			]
		},
		{
			id: 2, text: "Contact Information", children: [
				{ id: 21, text: "Contact Us"/*, link: "https://en.wikipedia.org/wiki/Example"*/ }
			]
		}
	]
}
