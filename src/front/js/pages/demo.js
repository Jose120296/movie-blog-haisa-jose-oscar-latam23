import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import "../../styles/demo.css";
import { Favorites } from "../component/favorites";

export const Demo = () => {

	return (
		<div className="profile-page sidebar-collapse">
		
        
			<div className="page-header header-filter" data-parallax="true" ></div>
				<div className="main main-raised">
				<div className="profile-content">
					<div className="container">
						<div className="row">
							<div className="col ml-auto mr-auto">
								<div className="profile">
									<div className="avatar fotoAvatar" >
										<img src="https://api.multiavatar.com/Haisa.png" alt="Circle Image" className="img-raised rounded-circle img-fluid"/>
									</div>
									<div className="name">
										<h3 className="title">username</h3>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="description text-center">
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima iusto repellendus, vero ullam laborum beatae placeat eveniet dolore repellat animi, odio consequuntur molestiae blanditiis deserunt sit nostrum quibusdam accusantium facilis. </p>
					</div>
					<div className="container">
						<div className="row">
							<ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
								<li className="nav-item" role="presentation">
									<button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
										<div className="iconosFav">
											<i className="material-icons">star</i> <span>Favorito</span>
										</div>
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
										<div className="iconosFav">
											<i className="material-icons">favorite</i> <span>Por ver</span>
										</div>
									</button>
								</li>
							</ul>

							<div className="tab-content" id="myTabContent">
								<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
									<Favorites/>
								</div>
								<div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};
