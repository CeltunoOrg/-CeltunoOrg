import { IDayActivity, IMyDay, IPreset } from "../types/day.type";

    
    const FakeDay = () => {

        let myActivity: IDayActivity;
        let myPreset: IPreset
        let myDay: IMyDay;
        let id = 1;
        let myActivties: IDayActivity[] = []
        let myPresets: IPreset[] = []

        let fetchedDay: IMyDay | null = null

        myDay = testData[0]

        fetchedDay = {
            Id: id,
            Name: "Name",
            Description: "Description",
            // images: [],
            Activities: []
        }

        myActivity = {
            Id: 1,
            Name: "Name",
            // Description: "Description",
            Image: "Image",
            Order: "0",
            Selected: false
        }

        let myActivityPreset: IDayActivity = {
            Id: 111,
            Name: "ActivityPreset1",
            // Description: "Description",
            Image: "Image",
            Order: "0",
            Selected: false
        }

        myActivties.push(myActivity)
        let myActivity2 = {...myActivity}
        myActivties.push(myActivity2)
        myActivties[1].Id = 2;
        myActivties[1].Name = "Name2";


        myPreset =
        {
            Id: 1,
            Name: "Preset",
            Description: "Description",
            Activities: [myActivityPreset]
        };

        myPresets = [

            {
                Id: 1,
                Name: "Preset1",
                Description: "Description",
                Activities: []
            },
            {
                Id: 2,
                Name: "Preset2",
                Description: "Description",
                Activities: []

            }
        ]

        console.log(` Day: ${fetchedDay.Id} - ${fetchedDay.Name} `)

        console.log("Activities")
        fetchedDay.Activities = myActivties
        console.log(fetchedDay.Activities);

        console.log("Adding activity")
        let myActivity3 = {...myActivity};
        myActivity3.Id = 3
        myActivity3.Name = "Name3"
        fetchedDay.Activities.push(myActivity3)
        console.log(fetchedDay.Activities);


        console.log("Presets")
        console.log(myPresets);

        console.log(" \"My preset\" ")
        console.log(myPreset);


        console.log("With one preset")
        myPreset.Activities.map(item =>
            fetchedDay?.Activities.push(item)
        );
        console.log(fetchedDay.Activities);

        // myPreset.Activities.forEach(item => fetchedDay?.Activities.push(item));
        // console.log("With \"my\" preset")
        // console.log( fetchedDay.Activities)
        let myPreset2 = {
            Id: 22,
            Name: "PresetClone",
            Description: "Description",
            Activities: [
                {
                    Id: 222,
                    Name: "ActivityPreset2",
                    // Description: "Description",
                    Image: "Image",
                    Order: "0",
                    Selected: false
                }
            ]
        }
        // myPresets.push(myPreset)
        console.log("With \"my\" presets")
        myPresets.map(element => {
            element.Activities.map(item => fetchedDay?.Activities.push(item));
        });
        console.log(fetchedDay.Activities);

        myPresets.push(myPreset2)
        myPresets.map(element => {
            if (element.Id === 22) {

                element.Activities = myPreset2.Activities
                element.Activities.map(item => fetchedDay?.Activities.push(item));

                console.log("presetclone")
                console.log(myPresets)

            }
        })
        // console.log(fetchedDay);
        return fetchedDay;

    }

    const testData: IMyDay[] =
    [
        {
            Id: 1,
            Name: "Preset",
            Description: "Description",
            // images: ["image5.png","image7.png"],
            Activities: [

                {
                    Id: 2,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image6.png",
                    Order: "0",
                    Selected: false
                },
                {
                    Id: 3,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image7.png",
                    Order: "1",
                    Selected: false
                },
                {
                    Id: 4,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image8.png",
                    Order: "2",
                    Selected: false
                },
                {
                    Id: 6,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image10.png",
                    Order: "3",
                    Selected: false
                },
                {
                    Id: 7,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image11.png",
                    Order: "4",
                    Selected: false
                }
            ]
        },
        {
            Id: 5,
            Name: "Preset2",
            Description: "Description2",
            // images: ["image9.png"],
            Activities: [
                {
                    Id: 6,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image10.png",
                    Order: "0",
                    Selected: false
                },
                {
                    Id: 7,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image11.png",
                    Order: "1",
                    Selected: false
                }
            ]
        }
    ]

    export default FakeDay