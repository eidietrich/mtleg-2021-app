// colors

// TODO: Add party colors

export const statusColors = (billStatus) => {
    return {
        live: '#e8dc74',
        stalled: '#fc8d59',
        'became-law': '#91cf60',
    }[billStatus] || '#666'
}

export const partyColors = (partyLetter, variant = null) => {
    if (variant === 'lighter') {
        return {
            'R': '#f2b4b1',
            'D': '#b6cff0',
            'L': '#efcf7f',

        }[partyLetter] || '#666'
    }
    if (variant === 'darker') {
        return {
            'R': '#b51910',
            'D': '#285a9c',
            'L': '#a35b05',
        }[partyLetter] || '#666'
    }
    return {
        'R': '#d73027',
        'D': '#4575b4',
        'L': '#e89a0b'
    }[partyLetter] || '#666'
}

export const positionColors = (positionLetter) => {
    return {
        Y: '#91cf60',
        N: '#fc8d59'
    }[positionLetter] || '#bbb'
}


// Menus
// TODO: Automate pulling these from WordPress
export const footerLogoUrl = 'https://montanafreepress.org/wp-content/uploads/2020/05/website-footer-logo-1.png'
export const footerMenus = [
    {
        label: 'Projects',
        items: [
            {
                label: 'COVID-19 Pandemic',
                url: 'https://montanafreepress.org/covid-19-pandemic/',
            },
            {
                label: 'Elections',
                url: 'https://montanafreepress.org/election/',
            },
            {
                label: 'MT Lowdown Podcast',
                url: 'https://montanafreepress.org/mt-lowdown-podcast/',
            },
            {
                label: 'The Long Streets Project',
                url: 'https://montanafreepress.org/long-streets/',
            },
            {
                label: 'Graying Pains',
                url: 'https://montanafreepress.org/graying-pains/',
            }
        ]
    },
    {
        label: 'About',
        items: [
            {
                label: 'About MTFP',
                url: 'https://montanafreepress.org/about-mtfp/',
            },
            {
                label: 'Publish our work',
                url: 'https://montanafreepress.org/publish-our-work/',
            },
            {
                label: 'Contact us',
                url: 'https://montanafreepress.org/contact/',
            }
        ]
    },
    {
        label: 'Join',
        items: [
            {
                label: 'Subscribe',
                url: 'https://montanafreepress.org/sign-up/',
            },
            {
                label: 'Donate',
                url: 'https://checkout.fundjournalism.org/memberform?org_id=montanafreepress&campaign=7014o000000JNZvAAO',
            }
        ]
    }
]