Rails.application.routes.draw do
  root to: 'home#index'
  
  resources :users, only: [:create]
  resources :sessions, only: [:create]
  
  resources :expenses, only: [:index, :create, :update, :destroy] do
    post :update, on: :member
  end
  resources :budgets, only: [:show, :create, :update]

  get '/budget', to: 'budgets#show'
  
  get '/expenses', to: 'expenses#index'
  get 'expenses/add', to: 'expenses#new'
  
  get '/authenticated', to: 'sessions#authenticated'
  delete '/logout', to: 'sessions#destroy'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"

  # Catch all undefined routes and redirect to root, but exclude Active Storage paths
  match '*path', to: 'home#index', via: :all, constraints: ->(req) { !req.path.start_with?('/rails/active_storage') }
end