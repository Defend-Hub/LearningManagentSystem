import Link from 'next/link'

function Footer() {
  return (
    <div className='footer'>
        <p>© {new Date().getFullYear()} DefendHub. All rights reserved.</p>
        <div className='footer__links'>  
        {["About Us", "Contact Us", "Privacy Policy", "Terms of Service"].map((item: any) => (
            <Link key={item} 
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className='footer__link'>
                {item}
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Footer
