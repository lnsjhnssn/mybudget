class Expense < ApplicationRecord
  belongs_to :user
  has_many :expense_tags, dependent: :destroy
  has_many :tags, through: :expense_tags
  has_one_attached :image

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end
end
