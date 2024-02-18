

function ContactInformation({
	handleStep,
	profile,
}: {
	handleStep: (step: string) => void;
	profile: TProfile | null;
}) {
	

	useEffect(() => {
		if (profile) {
			const getContacts = async () => {
				const contactsArray = await getContactsData(
					profile?._id as string,
				);
				setContacts(contactsArray);
			};
			getContacts();
		}
	}, [profile]);

	return (
		
	);
}

export default ContactInformation;
