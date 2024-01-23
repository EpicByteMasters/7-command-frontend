interface roleUrls {
	id: number;
	name: string;
	url: string;
}

const roleUrl: roleUrls[] = [
	{ id: 1, name: 'myteam', url: '/service-iprs/myteam' },
	{ id: 1, name: 'mentor', url: '/service-iprs/mentor' },
	{ id: 2, name: 'my', url: '/service-iprs/my' },
];

export default roleUrl;
