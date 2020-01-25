import React from 'react';
import FlatfileImporter from 'flatfile-csv-importer';
import Button from '../../shared/components/FormElements/Button';
import styled from 'styled-components';

const LICENSE_KEY = 'd869a402-227a-4266-84b7-3954aa904d56';

function FileImporter (props) {
	const importer = new FlatfileImporter(LICENSE_KEY, {
		fields: [
			{
				label: 'Event',
				key: 'value',
				isRequired: false,
				description: 'Name of the event.',
				validator: {
					validate: 'regex_matches',
					regex: /^(?=.*[a-zA-Z0-9])[\w.,?!'"-#$%& ]+$/,
					error: 'Alphanumeric, numbers and punctuation only'
				}
			}
		],
		type: 'lineChart',
		allowInvalidSubmit: false,
		managed: true,
		allowCustom: true,
		disableManualInput: false,
		maxSize: 400000,
		maxRecords: 100
	});

	const importHandler = event => {
		importer
			.requestDataFromUser()
			.then(results => {
				importer.displayLoader();
				setTimeout(() => {
					importer.displaySuccess('Success!');
					props.onFileImported(results.validData);
				}, 1500);
			})
			.catch(function (error) {
				console.info(error || 'window close');
			});
	};

	return (
		<DivWrapper>
			<Button id='import' onClick={importHandler}>
				Import File
			</Button>
			<StyledSpan>
				Import a comma delimited file of labels one for each date. Useful for
				annotating dates with news events.
			</StyledSpan>
		</DivWrapper>
	);
}

export default FileImporter;

const DivWrapper = styled.div`margin-top: 10px;`;
const StyledSpan = styled.span`margin-left: 10px;`;
